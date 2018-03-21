import React, { Component } from 'react';

export default class Question extends Component {
    constructor() {
        super();
        this.state = {
            selected: '',
            index: 1
        };
        this.funcMap = {
            radio: () => this.renderRadioOpt(),
            checkbox: () => this.renderCheckboxOpt(),
            text: () => this.renderTextOpt(),
            textarea: () => this.renderTextAreaOpt()
        };
        this.makeRadioJSX = this.makeRadioJSX.bind(this);
        this.makeCheckboxJSX = this.makeCheckboxJSX.bind(this);
    }

    onAddNewInput(makerFunc) {
        const items = [];

        for (let i = 0; i < this.state.index; i++) {
            items.push(makerFunc(i));
        }

        return items;
    }
    onAddNewInputClick() {
        this.setState({ index: this.state.index + 1 });
    }
    makeRadioJSX(ind) {
        return (
            <div key={ind} className="question-type-replicator">
                <input type="radio" className="form-control" />
                <input
                    onChange={e => this.props.onInputChange(e)}
                    name={`value_${this.props.index}_${ind}`}
                    type="text"
                    placeholder="Add meg a lehetséges választ..."
                    className="form-control"
                />
                <button className="btn btn-warning btn-sm"> Törlés </button>
            </div>
        );
    }
    makeCheckboxJSX(ind) {
        return (
            <div key={ind} className="question-type-replicator">
                <input type="checkbox" className="form-control" />
                <input
                    onChange={e => this.props.onInputChange(e)}
                    name={`value_${this.props.index}_${ind}`}
                    type="text"
                    placeholder="Add meg a lehetséges választ..."
                    className="form-control"
                />
                <button className="btn btn-warning btn-sm"> Törlés </button>
            </div>
        );
    }
    renderAddNewButton() {
        return (
            <button
                onClick={() => this.onAddNewInputClick()}
                className="btn btn-success btn-sm"
            >
                + Opció hozzáadása
            </button>
        );
    }
    renderRadioOpt() {
        return (
            <div className="">
                {this.onAddNewInput(this.makeRadioJSX)}

                <div>{this.renderAddNewButton()}</div>
            </div>
        );
    }
    renderCheckboxOpt() {
        return (
            <div className="">
                {this.onAddNewInput(this.makeCheckboxJSX)}
                <div>{this.renderAddNewButton()}</div>
            </div>
        );
    }
    renderTextOpt() {
        return (
            <div className="">
                <input
                    onChange={e => this.props.onInputChange(e)}
                    name={`value_${this.props.index}`}
                    type="text"
                    placeholder="Add meg a lehetséges választ..."
                    className="form-control"
                />
            </div>
        );
    }

    renderTextAreaOpt() {
        return (
            <div className="">
                <textarea
                    onChange={e => this.props.onInputChange(e)}
                    name={`value_${this.props.index}`}
                    className="form-control"
                    cols="20"
                    rows="5"
                    placeholder="Add meg a lehetséges választ..."
                />
            </div>
        );
    }

    onTypeChange(e) {
        this.setState({ selected: e.target.value });
    }

    renderType() {
        return this.funcMap[this.state.selected]
            ? this.funcMap[this.state.selected]()
            : '';
    }
    render() {
        const questionTypes = [
            {
                type: 'radio',
                displayName: 'Egy választási lehetőség - Rádio gomb'
            },
            {
                type: 'checkbox',
                displayName: 'Több választási lehetőség - Checkbox'
            },
            { type: 'text', displayName: 'Szöveg bevitel(rövid) - Text' },
            {
                type: 'textarea',
                displayName: 'Szöveg bevitel(hosszű) - Textarea'
            }
        ];

        return (
            <div style={{ width: '100%' }}>
                <div
                    className="question-input-card"
                    index={this.props.index}
                    onChange={e => this.props.onInputChange(e)}
                >
                    <div className="question-label">
                        <label>Kérdés címe: </label>
                    </div>
                    <div className="question-input">
                        <input
                            onChange={e => this.props.onInputChange(e)}
                            className="form-control"
                            type="text"
                            name={`questionTitle_${this.props.index}`}
                            placeholder="Add meg a kérdés címét"
                            required={true}
                        />
                    </div>
                    <div className="question-label">
                        <label>Kérdés típusa: </label>
                    </div>
                    <div className="question-input">
                        <select
                            className="form-control"
                            name={`questionType_${this.props.index}`}
                            onChange={e => this.onTypeChange(e)}
                            onSelect={e => this.props.onInputChange(e)}
                        >
                            <option value="" disabled selected>
                                Válassz kérdés típust
                            </option>
                            {questionTypes.map((questionType, ind) => (
                                <option key={ind} value={questionType.type}>
                                    {questionType.displayName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={e =>
                            this.props.deleteQuestion(e.target.dataset.index)
                        }
                        className="btn btn-small btn-danger delete-question"
                        data-index={this.props.index}
                    >
                        X
                    </button>
                </div>

                {this.renderType()}
            </div>
        );
    }
}
