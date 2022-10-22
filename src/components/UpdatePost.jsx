import { Form } from 'react-router-dom'

const UpdatePost = ({id, title, body, userId, submitting}) => {
  return (
    <Form method='post' action={`/posts/${id}/edit`}>
      <label>
        Title: 
        <input type="text" name="title" defaultValue={title} />
      </label>
      <label>
        Body: 
        <input type="text" name="body" defaultValue={body} />
      </label>
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="id" value={id} />
      <input type="submit" value="Update post" disabled={submitting} />
    </Form>
  )
}

export default UpdatePost