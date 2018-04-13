import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-radio-group/paper-radio-group';
import '@polymer/paper-radio-button/paper-radio-button';

class RadioQuestion extends PolymerElement {
    static get properties() {
        return {
            choices: Array,
            invalid: {
                type: Boolean,
                value: false,
            },
            required: {
                type: Boolean,
            },
            disabled: {
                type: Boolean,
            },
            value: {
                type: String,
                value: '',
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
            <paper-radio-group selected="{{value}}">
                <template is="dom-repeat" items="[[choices]]" as="choice">
                    <paper-radio-button name$="[[choice.name]]">[[choice.label]]</paper-radio-button>
                </template>
                <span class="invalid" hidden$="[[!invalid]]">*</span>
            </paper-radio-group>
        `;
    }

    validate() {
        this.invalid = this.required ? this.value === '' : false;
        return !this.invalid;
    }
} 
customElements.define('radio-question', RadioQuestion);