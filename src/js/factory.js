import PostController from './post-controller.js'
import PostService from './post-service.js'

const CreatePostController = (apiURL, dataLimit) => {
  const postService = new PostService(apiURL, dataLimit)
  return new PostController(postService)
}

export default CreatePostController
