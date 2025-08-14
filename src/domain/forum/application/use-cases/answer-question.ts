import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import type { AnswerRepository } from '../repositories/answer-repository'
import { Either, right } from '@/core/either'

interface AnswerQuestionUseCaseRequest {
  questionId: string
  instructorId: string
  content: string
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) { }

  async execute({
    questionId,
    instructorId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    this.answerRepository.create(answer)

    return right({ answer })
  }
}
