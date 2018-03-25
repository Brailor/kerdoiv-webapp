import React, { Component } from 'react';
import Question from './Question';
import { Link } from 'react-router-dom';
import { Questionnaire, Subject } from '../../middleware/index';
import history from '../../util/history';

class Form extends Component {
    state = {
        index: 0
    };

    async componentDidMount() {
        this.onAddQuestionClick();
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
    }

    deleteQuestion(itemIndex) {
        // let deletionIndex = this.state.questions.findIndex(question => question.props.index === Number(itemIndex));
        console.log('item to delete ', itemIndex);
        /*  let newArr = Object.assign([], this.state.questions);
        newArr.splice(deletionIndex, 1);

        //TODO: meg kell fixálni ezt, valamiért mindíg az utolsó elemet törli ki
        this.setState({
            questions: newArr
        }); */
    }
    onAddQuestionClick() {
        this.setState({ index: this.state.index + 1 });
    }

    renderQuestions() {
        const items = [];

        for (let i = 0; i < this.state.index; i++) {
            items.push(
                <Question
                    key={i}
                    index={i}
                    onInputChange={(e, type) => this.onInputChange(e)}
                    deleteQuestion={index => this.deleteQuestion(index)}
                />
            );
        }

        return items;
    }

    sendQuestionnaire() {
        const newObj = Object.assign({}, this.state);
        const { title, description, index } = newObj;
        delete newObj.description;
        delete newObj.index;
        delete newObj.title;

        /* TODO :
            Bug, amit ki kell majd javítani:
            Ha kiválasztunk egy kérdés típust pl: radio és megadunk értékeket, majd átváltjuk ezt a kérdéstípust
            mondjuk text-re, akkor az elkészült végső object-ben benne lesznek a radio-value-k is a text value mellett.
            Fixálni kell!!!
         */
        const questions = [];
        const keys = Object.keys(newObj);
        for (let qa in newObj) {
            const [key, questionIndex, valueIndex = -1] = qa.split('_');

            let x = questions[questionIndex] || { answerOpts: [] };

            if (key === 'questionTitle') x.title = newObj[`${key}_${questionIndex}`];
            else if (key === 'questionType') x.qType = newObj[`${key}_${questionIndex}`];
            else if (key === 'value' && valueIndex >= 0) {
                x.answerOpts.push(newObj[`${key}_${questionIndex}_${valueIndex}`]);
            } else {
                x.answerOpts.push(newObj[`${key}_${questionIndex}`]);
            }
            questions[questionIndex] = x;
        }

        const newQuestion = {
            title,
            description,
            questions: [...questions]
        };

        Questionnaire.create(newQuestion)
            .then(res => {
                /* TODO: itt majd el kell lőni egy action-t, ami elmenti a store-ba
                    az újonnan elkészült kérdőívet, amit a responseból kapunk.
                */
                history.push('/kerdoiv-keszites');
            })
            .catch(console.error);
    }
    render() {
        return (
            <div>
                <div className="subjects-landing-page">
                    <div className="row">
                        <div className="col-sm-8 offset-sm-2">
                            <div className="card">
                                <div
                                    className="card-header text-center"
                                    style={{
                                        marginLeft: '0px',
                                        marginRight: '0px'
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-sm-2 offset-sm-1">
                                            <b>
                                                <label>Kérdőív címe: </label>
                                            </b>
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="title"
                                                required
                                                placeholder="Add meg a kérdőív címét"
                                                onChange={e => this.onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-1">
                                        <div className="col-sm-2 offset-sm-1">
                                            <b>
                                                <label>Tantárgy: </label>
                                            </b>
                                        </div>
                                        <div className="col-sm-6">
                                            <select
                                                className="form-control"
                                                name="subject"
                                                onChange={e => this.onInputChange(e)}
                                            >
                                                <option value="" disabled selected>
                                                    Válassz
                                                </option>

                                                <option>egy</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="card-block row"
                                    style={{
                                        marginLeft: '0px',
                                        marginRight: '0px'
                                    }}
                                >
                                    <div className="col-sm-3">
                                        <label>
                                            <b>
                                                <h4>Kérdőív leírása:</h4>
                                            </b>
                                        </label>
                                    </div>
                                    <div className="col-sm-9">
                                        <textarea
                                            className="form-control"
                                            placeholder="Add meg a kérdőív leírását"
                                            name="description"
                                            required
                                            onChange={e => this.onInputChange(e)}
                                        />
                                    </div>
                                    {this.renderQuestions()}
                                    <div className="question-input-card">
                                        <button
                                            onClick={() => this.onAddQuestionClick()}
                                            className="btn btn-warning btn-block"
                                        >
                                            + Új kérdés hozzáadás
                                        </button>
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <button
                                        onClick={() => this.sendQuestionnaire()}
                                        className="btn btn-success btn-block"
                                    >
                                        <i className="fas fa-save" /> Elküldés
                                    </button>
                                    <Link to={`/kerdoiv-keszites`} className="btn btn-warning btn-block">
                                        <i className="fas fa-arrow-alt-circle-left" />Vissza
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form;
