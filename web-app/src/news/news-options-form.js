import React, {Component} from 'react';
import {Form, Scope, Text, TextArea} from 'informed';
import CooldownFieldset from '../forms/cooldown-fieldset';
import styles from './news.module.scss';
import NumberOption from "../forms/number-option";
import CheckBoxOption from "../forms/checkbox-option";

class NewsOptionsForm extends Component {
    constructor() {
        super();
        this.state = {news: []};
        this.addNewsItem = this.addNewsItem.bind(this);
        this.deleteNewsItem = this.deleteNewsItem.bind(this);
        this.renderNews = this.renderNews.bind(this);
    }

    render() {
        return (
            <Form id="options" {...this.props}>
                <fieldset>
                    <NumberOption id="fetchInterval" label="Refresh news every X (minutes)"/>
                    <NumberOption id="showInterval" label="Show news every X (minutes)"/>
                    <CheckBoxOption id="cycle" label="Cycle news"/>
                </fieldset>
                <fieldset>
                    {this.renderNews()}
                </fieldset>
                <div className="button-bar">
                    <button onClick={this.addNewsItem}>
                        Add
                    </button>
                </div>
            </Form>
        );
    }

    renderNews(formState) {
        console.log('state news', this.state.news);
        return this.state.news && this.state.news.map((newsItem, index) => {
            return (
                <div className={styles.newsItem} key={`newsItem-${index}-${JSON.stringify(newsItem)}`}>
                    <div>
                        <Scope scope={`news[${index}]`}>
                            Url: (file in media folder or internet url)
                            <Text field="url" id={`newsItem-${index}-${JSON.stringify(newsItem)}-url`}
                                  initialValue={newsItem.url}
                            />
                        </Scope>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={() => {
                            this.deleteNewsItem(index, formState)
                        }}>Delete
                        </button>
                    </div>
                </div>)
        });
    }

    addNewsItem() {
        const newNews = [].concat(this.state.news);
        newNews.push({url: '', words: ''});
        this.setState({news: newNews})
    }

    deleteNewsItem(index) {
        const newNews = ([].concat(this.state.news));
        newNews.splice(index, 1);
        this.setState({news: newNews})
    }

    componentDidMount() {
        this.setState({news: this.props.news || []});
    }
}

export default NewsOptionsForm;
