
**# Expense Tracker Application**

This is a well-organized expense tracker application that helps you manage your finances effectively. Let's dive into its features and planned enhancements.

## Initial Data Load

**Question:** Do we have to load all items from the Pinia store when the page loads?

**Answer:**  The decision of loading all items on page load depends on your specific use case and the number of transactions you expect. Here are some considerations:

- **Small Datasets:** If you expect a relatively small number of transactions, loading them upfront might be acceptable for faster initial display.
- **Large Datasets:** For a large number of transactions, consider lazy loading (`load more on scroll`) or pagination for improved performance and user experience. This avoids overwhelming users with all data at once.

Ultimately, weigh the benefits of initial data availability against potential performance impacts.

## Enhancements Planned

- **Eslint Rules:** Enforce consistent coding style and best practices with ESLint for cleaner code and easier collaboration.
- **Husky:** Automate pre-commit checks (e.g., linting, formatting) with Husky to ensure code quality before pushing to a repository.
- **Playwright Testing:** Implement Playwright for writing automated tests to ensure application functionality and prevent regressions as your code evolves.

## Feature Wishlist

- **Search Feature:** Allow users to efficiently search for specific transactions by title or amount, enhancing usability.
- **Delete Entire Transactions:** Implement a button or option to remove all transactions in a single action, streamlining cleanup for power users.
- **Transaction Scrolling:** If a large number of transactions exceeds a certain limit, introduce a smooth scrolling experience to avoid overwhelming the user's view.
- **Transaction Limit:** Consider setting a limit (e.g., 500) on the number of transactions displayed to optimize performance and avoid overwhelming the UI.
- **Theming:** Offer a dark mode (black and white theme) to provide users with a visual preference and adjustability for better viewing experience in different environments.
- **Login:** Implement a login system using either local storage or a database like Firebase to enable data persistence across sessions and potentially unlock additional features like user-specific transaction management.

## Additional Notes

- Prioritize these enhancements based on your needs and available resources.
- Provide clear documentation for any additional configuration or dependencies for the planned features.


### Miscellaneous information to test :

- to start recording tests you need to run ```npx playwright codegen``` command, a browser windows will open and test inspector, you can copy the target elements directly
- to start a specific test script, you can run ```npx playwright test scriptName```, where _scriptname_ is the name of the script, the words that scriptname contains
- 



