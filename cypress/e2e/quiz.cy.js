const urlTestSite = 'http://localhost:5173/';
const urlQuizAPI = 'https://opentdb.com/api.php?amount=10&type=multiple';

describe("Quiz App", () => {
  beforeEach(() => {
    cy.visit(urlTestSite)
  })

  it('Should start the quiz when the "Start Quiz" button is clicked and display the results after completion', () => {
    // Проверяем, что кнопка "Start Quiz" отображается и доступна для клика
    cy.intercept(urlQuizAPI, { fixture: 'quizData.json' }).as('quizData');
    cy.contains("Start Quiz").should("be.visible").click();

    // Проверяем, что вопросы викторины загружаются после нажатия кнопки "Start Quiz"
    cy.wait('@quizData').then(({ response }) => {
      expect(response.body.results).to.have.lengthOf.at.least(1);
    });

    cy.contains('Set').click();
    cy.contains('Next').click();
    cy.contains('Burial').click();
    cy.contains('Next').click();
    cy.contains('Gale').click();
    cy.contains('Next').click();

    // Проверяем, что отображается экран результатов
    cy.contains('Results').should('be.visible');
  });
});
