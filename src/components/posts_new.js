import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(fields) {
		this.props.createPost(fields)
			.then(() => {
				//bp has been created, navigate to index
				// navigate by calling this.context.router.push with the new path
				this.context.router.push('/');
			});
	}

	render() {
		const { fields: { title, categories, content }, handleSubmit } = this.props;
		// const title = this.props.fieds.title; // not shorthanded, see above
		console.log(title);
		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<h3>Create a new post</h3>
					
					<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
						<label>Title</label>
						<input type="text" className="form-control" {...title}/>
						<div className="text-help">
							{title.touched ? title.error : ''}
						</div>
					</div>
					<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
						<label>Categories</label>
						<input type="text" className="form-control" {...categories}/>
						<div className="text-help">
							{categories.touched ? categories.error : ''}
						</div>
					</div>
					<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
						<label>Content</label>
						<textarea className="form-control" {...content} />
						<div className="text-help">
							{content.touched ? content.error : ''}
						</div>
					</div>

					<button type="submit" className="btn btn-primary">Submit</button>
					<Link to="/" className="btn btn-danger">
						Cancel
					</Link>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Enter a username';
	}

	if (!values.categories) {
		errors.categories = 'Enter categories';
	}

	if (!values.content) {
		errors.content = 'Enter content';
	}

	return errors;
}

// connect: first arg is mapStateToProps, 2nd mapDispatchToProps
// reduxForm: 1 config, 2 mapStateToProps, 3d mapDispatchToProps

export default reduxForm({
	form: 'PostsNewForm',
	fields: ['title', 'categories', 'content'],
	validate
}, null, { createPost }) (PostsNew);

