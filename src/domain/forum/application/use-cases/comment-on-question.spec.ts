import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { expect } from 'vitest'
import { InMemoryQuestionsCommentsRepository } from 'test/repositories/in-memory-questions-comments-repository'

let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentsRepository = new InMemoryQuestionsCommentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionsCommentsRepository)
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comment content',
    })

    expect(inMemoryQuestionsCommentsRepository.items[0].content).toEqual('Comment content')
  })
})

