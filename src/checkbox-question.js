import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-checkbox/paper-checkbox';

class CheckboxQuestion extends PolymerElement {
    static get properties() {
        return {
            choices: Array,
            required: {
                type: Boolean,
            },
            invalid: {
                type: Boolean,
                value: false,
            },
            disabled: {
                type: Boolean,
            },
            value: {
                type: String,
                value: '',
                observer: '_valueChanged'
            },
        }
    }
    static get template () {
        // Always return an HTMLTemplateElement, not a string literal
        return html`
            <style>
                paper-checkbox {
                    margin: 12px;
                }
                .invalid {
                    color: red;
                }
            </style>
            <template is="dom-repeat" items="[[choices]]" as="choice">
                <paper-checkbox data-name$="[[choice.name]]" on-change="_setValue">[[choice.label]]</paper-checkbox>
            </template>
            <span class="invalid" hidden$="[[!invalid]]">*</span>
        `;
    }

    validate() {
        this.invalid = this.required ? this.value === '' : false;
        return !this.invalid;
    }

    _getElFromName(name) {
        return this.shadowRoot.querySelector(`paper-checkbox[data-name="${name}"]`);
    }

    _valueChanged(value, old) {
        const cbs = Array.from(this.shadowRoot.querySelectorAll('paper-checkbox'));
        const toCheck = new Set(value.split(','));
        const toUncheck = cbs.filter(cb => !toCheck.has(cb.dataset.name));

        toUncheck.forEach(cb => cb ? cb.checked = false : null);
        
        toCheck.forEach(name => {
            const cb = this._getElFromName(name);
            if (!cb) {
                return;
            }
            cb.checked = true;
        });
    }

    _setValue() {
        this.value = Array.from(this.shadowRoot.querySelectorAll('paper-checkbox'))
                        .filter(c => c.checked)
                        .map(c => c.dataset.name)
                        .join(',');
    }
} 
customElements.define('checkbox-question', CheckboxQuestion);