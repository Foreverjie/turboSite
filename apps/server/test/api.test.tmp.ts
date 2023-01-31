import request from 'supertest'

const baseURL = 'http://localhost:9797/trpc'

describe('GET /cat.list', () => {
  //   beforeAll(async () => {
  //     // set up the todo
  //     await request(baseURL).get('/cat.list')
  //   })
  //   afterAll(async () => {
  //     await request(baseURL).delete(`/todo/${newTodo.id}`)
  //   })
  it('should return 200', async () => {
    const response = await request(baseURL).get('/cat.list')
    expect(response.statusCode).toBe(200)
    expect(response.body.error).toBe(undefined)
  })
  it('should return cat list', async () => {
    const response = await request(baseURL).get('/cat.list')
    expect(response.body.result.data.length >= 1).toBe(true)
  })
})
