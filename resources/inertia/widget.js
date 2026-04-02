(function () {
    const csscls = PhpDebugBar.utils.makecsscls('phpdebugbar-widgets-');

    class InertiaWidget extends PhpDebugBar.Widget {
        get className() {
            return csscls('inertia');
        }

        render() {
            this.bindAttr('data', function (data) {
                this.el.innerHTML = '';

                if (!data.templates || data.templates.length === 0) {
                    const empty = document.createElement('div');
                    empty.classList.add(csscls('inertia-empty'));
                    empty.textContent = 'No Inertia page data';
                    this.el.append(empty);
                    return;
                }

                for (const tpl of data.templates) {
                    const section = document.createElement('div');
                    section.classList.add(csscls('inertia-page'));

                    const header = document.createElement('div');
                    header.classList.add(csscls('inertia-header'));

                    const name = document.createElement('span');
                    name.classList.add(csscls('inertia-component'));
                    name.textContent = tpl.name;
                    header.append(name);

                    if (tpl.type) {
                        const type = document.createElement('span');
                        type.classList.add(csscls('inertia-type'));
                        type.textContent = tpl.type;
                        header.append(type);
                    }

                    if (tpl.xdebug_link) {
                        header.append(PhpDebugBar.Widgets.editorLink(tpl.xdebug_link));
                    }

                    if (typeof tpl.param_count !== 'undefined') {
                        const count = document.createElement('span');
                        count.classList.add(csscls('inertia-count'));
                        count.textContent = tpl.param_count + ' props';
                        header.append(count);
                    }

                    section.append(header);

                    if (tpl.params && Object.keys(tpl.params).length > 0) {
                        const props = document.createElement('dl');
                        props.classList.add(csscls('inertia-props'));

                        for (const key in tpl.params) {
                            if (typeof tpl.params[key] === 'function') continue;

                            const dt = document.createElement('dt');
                            dt.textContent = key;

                            const dd = document.createElement('dd');
                            PhpDebugBar.Widgets.renderValueInto(dd, tpl.params[key]);

                            props.append(dt, dd);
                        }
                        section.append(props);
                    }

                    this.el.append(section);
                }
            });
        }
    }

    PhpDebugBar.Widgets.InertiaWidget = InertiaWidget;
})();
