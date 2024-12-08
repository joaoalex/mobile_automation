Feature: Second feature

  Scenario: Login with Locked creds
    Given I am on app login Page
    When I login with "alice@example.com" and "10203040"
    Then I see locked error message


