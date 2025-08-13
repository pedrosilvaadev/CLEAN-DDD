import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswerRepository } from "@/domain/repositories/answer-repository";

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }
}