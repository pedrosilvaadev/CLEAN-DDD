import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsCommentsRepository } from '../repositories/questions-comments-repository'

interface FetchQuestionsCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionsCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionsCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionsCommentsRepository) { }

  async execute({
    page,
    questionId
  }: FetchQuestionsCommentsUseCaseRequest): Promise<FetchQuestionsCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, { page })

    return { questionComments }
  }
}
