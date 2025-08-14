import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository {

  public items: Answer[] = []

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === answer.id.toString())

    this.items.splice(itemIndex, 1)
  }

  async save(answer: Answer): Promise<void> {
    const index = this.items.findIndex(item => item.id === answer.id)
    if (index >= 0) {
      this.items[index] = answer
    } else {
      this.items.push(answer)
    }
  }
}