import { VisualizationPage } from './app.po';

describe('visualization App', () => {
  let page: VisualizationPage;

  beforeEach(() => {
    page = new VisualizationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
