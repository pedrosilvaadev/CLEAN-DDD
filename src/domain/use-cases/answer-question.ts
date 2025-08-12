import { Answer } from "../entities/answer.js"
import type { AnswerRepository } from "../repositories/answer-repository.js"

interface AnswerQuestionUseCaseRequest {
  questionId: string
  instructorId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(
    private answerRepository: AnswerRepository
  ) { }

  async execute({ questionId, instructorId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      authorId: instructorId,
      questionId,
      content
    })

    this.answerRepository.create(answer)

    return answer
  }
}