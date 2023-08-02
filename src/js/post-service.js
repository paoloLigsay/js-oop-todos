export default class PostService {
  constructor(apiURL, dataLimit) {
    this.apiURL = apiURL
    this.max = dataLimit
  }

  async fetchTodos () {
    try {
      const response = await fetch(this.apiURL)

      // Initially checks error on response.
      if(!response.ok) {
        console.error(`${response.status}: ${response.statusText || 'Unknown Error.'}`);

        return {
          issuccess: false,
          error: response.statusText || 'Unknown Error.'
        }
      }
      
      const data = await response.json()
      let filteredData = []

      /*
      * Checks if data is not undefined.
      * FilteredData is the sliced data based on the limit given.
      * If the max limit is greater than the fata length, it will just return the data.
      */
      data && 
        (data.length > this.max ?
          filteredData.push(...data.slice(0, this.max))
          : filteredData.push(data))

      return {
        issuccess: true,
        data: filteredData
      }
    } catch (e) {
      console.error(e)

      return {
        issuccess: false,
        error: e
      }
    }
  }
}
