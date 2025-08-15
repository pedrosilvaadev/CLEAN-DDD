import { makeAnswer } from "test/factories/make-answer";
import { expect } from "vitest";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-asnwer-attachments-repository";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("Comment on answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository
    );
  });

  it("should be able to answer on answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "Answer content",
    });

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      "Answer content"
    );
  });
});
