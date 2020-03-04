beforeEach(function() {
      return browser.ignoreSynchronization = true;
    });

describe('when the user m.debski log in', function() {
  beforeEach(function() {
    var button = element(by.xpath('//button/span[1]'));
    var heading = element(by.xpath('//h1[@class=\'css-15nqyad css-dz545r1\']'));
    var email = element(by.id('email'));
    var password = element(by.id('password'));

    browser.get('https://accounts.labs.livechatinc.com');
    expect(button.getText()).toBe('Zaloguj się');
    email.clear();
    email.sendKeys('m.debski+frontend_tests@livechatinc.com');
    password.clear();
    password.sendKeys('test1@3$');
    button.click();
    browser.sleep(10000);
    expect(heading.getText()).toContain('AgentTestowy');
  });
  it('The client is looking for all bad and commented chats.', function() {

    var EC = protractor.ExpectedConditions;
    var archivesButton = element(by.xpath('//ul[@class=\'css-1l95nvm css-niuh3t0\']/li[4]/a[1]'));
    var addFilterButton = element(by.xpath('//button[@class=\'css-ddvln20 css-1cldot1 css-14vfi2r0\']'));
    var ratingFilterButton = element(by.xpath('//li[5]/div[1]/p[1]'));
    var badAndCommentButton = element(by.xpath('//ul[@class=\'css-14igyak css-ootah80\']/li[6]'));
    var showAllChatsButton = element(by.xpath('//button[@class=\'lc-btn lc-btn--full-width lc-btn--primary lc-btn--large css-9whsf3\']'));
    var agentNameButton = element(by.xpath('//p[@class=\'css-oefc55\']'));
    var badRatingComment = element(by.xpath('//p[@class=\'css-175f13p css-zjrybx2\']'));

    browser.wait(EC.elementToBeClickable(archivesButton), 2000);
    archivesButton.click();
    browser.wait(EC.elementToBeClickable(addFilterButton), 1000);
    addFilterButton.click();
    browser.wait(EC.elementToBeClickable(ratingFilterButton), 1000);
    ratingFilterButton.click();
    browser.wait(EC.elementToBeClickable(badAndCommentButton), 1000);
    badAndCommentButton.click();
    browser.wait(EC.elementToBeClickable(showAllChatsButton), 1000);
    showAllChatsButton.click();
    expect(agentNameButton.getText()).toContain('Agent: AgentTestowy');
    agentNameButton.click();
    expect(badRatingComment.getText()).toBe('Client no3 rated the chat as bad');

  });

  afterEach(function() {
    var EC = protractor.ExpectedConditions;
    var button = element(by.xpath('//div[@class=\'css-12inv2t css-7e05130\']/div[1]'));
    var logOffButton = element(by.xpath('//ul[6]/li[@class=\'css-8wgct9\' and 1]/a[1]'));
    var modalHeader = element(by.className('lc-modal__header'));
    var remindLaterButton = element(by.className('lc-btn lc-btn--secondary css-lvyu5j'));
    var logOffHeader = element(by.xpath('//h2[@class=\'overlay__title\']'));
    var signoutAppButton = element(by.id('signout-app'));

    button.click();
    browser.wait(EC.elementToBeClickable(logOffButton), 3000);
    expect(logOffButton.getText()).toBe('Log out');
    logOffButton.click();
    expect(modalHeader.getText()).toBe('Company details');
    remindLaterButton.click();
    browser.sleep(1000);
    expect(logOffHeader.getText()).toBe('Log out');
    browser.wait(EC.elementToBeClickable(signoutAppButton), 3000);
    signoutAppButton.click();
    browser.wait(EC.textToBePresentInElement($('.css-q2n3ul'), 'Wylogowanie pomyślne.'), 5000);
  });
});
