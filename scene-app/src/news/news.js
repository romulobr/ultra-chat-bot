import React, {Component} from 'react';
import {connect} from 'react-redux';
import './news.scss';
import NewsItem from './news-item';

class NewsItems extends Component {

    constructor() {
        super();
        this.deleteNewsItem = this.deleteNewsItem.bind(this);
        this.state = {newsItems: []};
    }

    deleteNewsItem(newsItem) {
        const newNewsItems = [].concat(this.state.newsItems);
        const index = newNewsItems.indexOf(newsItem);
        if (index !== -1) {
            newNewsItems.splice(index, 1);
        }
        this.setState({newsItems: newNewsItems});
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            const newNewsItems = [].concat(this.state.newsItems);

            const newNewsItem = {
                description: this.props.description,
                title: this.props.title,
                duration: (this.props.duration || 60),
                key: 'newsItem-' + this.props.id,
            };
            newNewsItem.onComplete = () => {
                console.log('deleting newsItem ', this.props.id);
                this.deleteNewsItem(newNewsItem)
            };
            newNewsItems.push(newNewsItem);

            this.setState({newsItems: newNewsItems});
        }
    }

    renderNewsItems() {
        return this.state.newsItems.map((newsItem) =>
            (<NewsItem description={newsItem.description}
                       title={newsItem.title}
                       duration={newsItem.duration}
                       key={newsItem.key}
                       onComplete={newsItem.onComplete}
                />
            )
        )
    }

    render() {
        return (
            <div className="application newsItems">
                {this.renderNewsItems()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.news
    };
}

export default connect(mapStateToProps)(NewsItems);
