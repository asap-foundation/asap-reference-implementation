# Contributing to ASAP

Thank you for your interest in contributing to the AI Site Agent Protocol (ASAP)! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/asap-reference-implementation.git
   cd asap-reference-implementation
   ```
3. **Install dependencies** for all components:
   ```bash
   # Root dependencies
   npm install

   # Component dependencies
   cd agent && npm install && cd ..
   cd registry && npm install && cd ..
   cd ai-consumer && npm install && cd ..
   cd examples && npm install && cd ..
   ```
4. **Start the demo** to verify everything works:
   ```bash
   npm run demo:windows  # Windows
   # or
   npm run demo          # Unix/Linux/Mac
   ```

## 📋 Development Workflow

### 1. Choose an Issue
- Check the [Issues](https://github.com/asap-foundation/asap-reference-implementation/issues) page
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to indicate you're working on it

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

### 3. Make Your Changes
- Follow the existing code style
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat: add new intent type for product search

- Add product_search intent to agent
- Update registry to handle new intent
- Add tests and documentation

Closes #123"
```

### 5. Push and Create PR
```bash
git push origin your-branch-name
```
Then create a Pull Request on GitHub.

## 🏗️ Project Structure

```
asap-reference-implementation/
├── agent/              # AI Agent service
│   ├── routes/         # API routes
│   ├── officialData.js # Mock data responses
│   ├── server.js       # Express server
│   └── signer.js       # Cryptographic signing
├── registry/           # Central registry service
│   ├── routes/         # API routes
│   └── server.js       # Express server
├── ai-consumer/        # Client library
│   ├── index.js        # Main consumer
│   └── utils/          # Helper utilities
├── examples/           # Usage examples
├── keys/               # Cryptographic keys (sample)
└── docs/               # Documentation
```

## 🎯 Areas for Contribution

### 🔧 Core Protocol
- **New Intent Types**: Add support for additional query types (jobs, events, etc.)
- **Security Enhancements**: Improve cryptographic implementations
- **Performance Optimization**: Optimize response times and resource usage

### 📚 Documentation
- **API Documentation**: Complete OpenAPI/Swagger specs
- **Tutorials**: Step-by-step guides for different use cases
- **Video Content**: Screencasts and demos

### 🧪 Testing
- **Unit Tests**: Test individual components
- **Integration Tests**: Test component interactions
- **Load Testing**: Performance and scalability tests

### 🌍 Internationalization
- **Multi-language Support**: Add support for different languages
- **Localization**: Translate responses and documentation

### 🔌 Integrations
- **SDKs**: Client libraries for different languages (Python, Go, etc.)
- **Frameworks**: Integration with popular frameworks (Next.js, etc.)
- **Platforms**: Ready-made integrations for AI platforms

## 📝 Code Style Guidelines

### JavaScript/Node.js
- Use ES6+ features
- Use `async/await` for asynchronous code
- Use meaningful variable and function names
- Add JSDoc comments for functions
- Follow the existing code structure

### Git Commit Messages
- Use conventional commits format:
  ```
  type(scope): description

  [optional body]

  [optional footer]
  ```
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Documentation
- Update README.md for any user-facing changes
- Add code comments for complex logic
- Update API documentation for endpoint changes

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run specific component tests
cd agent && npm test
cd registry && npm test
cd ai-consumer && npm test
```

### Writing Tests
- Use descriptive test names
- Test both success and error cases
- Include integration tests for API endpoints
- Mock external dependencies

## 📞 Getting Help

- **Issues**: Use GitHub Issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Discord/Slack**: Join our community chat (if available)

## 📄 License

By contributing to ASAP, you agree that your contributions will be licensed under the same license as the project (MIT License).

## 🙏 Recognition

Contributors are recognized in:
- The repository's contributor list
- Release notes for significant contributions
- Social media mentions (with permission)

Thank you for contributing to ASAP and helping build the future of AI-web interactions! 🚀
