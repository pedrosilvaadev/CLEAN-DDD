import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "./errors/not-allowed-error"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { AnswerRepository } from "../repositories/answer-repository"

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, {}>


export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) { }

  async execute({
    authorId,
    answerId,
    content
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())

    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answerRepository.save(answer)
    return right({})
  }
}
