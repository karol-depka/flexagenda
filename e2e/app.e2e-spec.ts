import { FlexagendaCliPage } from './app.po';

describe('flexagenda-cli App', function() {
  let page: FlexagendaCliPage;

  beforeEach(() => {
    page = new FlexagendaCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
