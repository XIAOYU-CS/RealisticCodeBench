import java.util.ArrayList;
import java.util.Stack;

public class ShuntingYard{

    private ArrayList<Token> originalExpression;
    private TreeNode<Token> expressionTree;
    private Stack<TreeNode<Token>> operandsStack;
    private Stack<Token> operatorsStack;

    public ShuntingYard(){
        operandsStack = new Stack<TreeNode<Token>>();
        operatorsStack = new Stack<Token>();
    }

    public TreeNode<Token> getExpressionTreeFromString(String arithmeticExpression) throws Exception{
        originalExpression = tokenizeExpression(arithmeticExpression);

        for ( Token lexeme : originalExpression ){

            if (lexeme.isOperator()){

                if (operatorsStack.isEmpty()){
                    operatorsStack.push(lexeme);
                } else {
                    if (lexeme.getValue().equals("(")){
                        operatorsStack.push(lexeme);
                    } else if ( lexeme.getValue().equals(")") ){

                        while (!operatorsStack.peek().getValue().equals("(")){
                            TreeNode<Token> newNode = new TreeNode<Token>(operatorsStack.pop());
                            newNode.setRightChild( operandsStack.pop() );
                            newNode.setLeftChild( operandsStack.pop() );
                            operandsStack.push(newNode);
                        }
                        operatorsStack.pop();

                    } else if ((operatorsStack.peek().getPrecedence() < lexeme.getPrecedence()) || operatorsStack.peek().getValue().equals("(")){
                        operatorsStack.push(lexeme);
                    } else {
                        while ( !operatorsStack.isEmpty() && (operatorsStack.peek().getPrecedence() >= lexeme.getPrecedence() )) {
                            TreeNode<Token> newNode = new TreeNode<Token>(operatorsStack.pop());
                            newNode.setRightChild( operandsStack.pop() );
                            newNode.setLeftChild( operandsStack.pop() );
                            operandsStack.push(newNode);
                        }
                        operatorsStack.push(lexeme);
                    }

                }

            } else {
                operandsStack.push( new TreeNode<Token>(lexeme) );
            }
        }

        while ( !operatorsStack.isEmpty()) {
            TreeNode<Token> newNode = new TreeNode<Token>(operatorsStack.pop());
            newNode.setRightChild( operandsStack.pop() );
            newNode.setLeftChild( operandsStack.pop() );
            operandsStack.push(newNode);
        }
        
        if (operandsStack.size() == 1){
            expressionTree = operandsStack.pop();
            return expressionTree;
        } else {
            throw new Exception("Expresión Incorrecta");
        }
        
    }


    //Code generated using ChatGPT
    private ArrayList<Token> tokenizeExpression(String expression) {
        ArrayList<Token> tokens = new ArrayList<Token>();

       // Split the expression into individual tokens
       String[] expressionTokens = expression.split("(?<=[+\\-*/()])|(?=[+\\-*/()])");

        for (String tokenValue : expressionTokens) {
            Token token = new Token();

            // Check if the token is an operator
            if (isOperator(tokenValue)) {
                token.setOperator(true);
                token.setPrecedence(getOperatorPrecedence(tokenValue));
            } else {
                token.setOperator(false);
                token.setPrecedence((byte) 0); // Assuming non-operators have precedence 0
            }

            // Set the value of the token
            tokenValue = tokenValue.trim();

            if (!tokenValue.equals("")){
                token.setValue(tokenValue);

                // Add the token to the list
                tokens.add(token);
            }
            
        }

        return tokens;
    }

    // Helper method to check if a given string is an operator
    private static boolean isOperator(String tokenValue) {
        return tokenValue.matches("[+\\-*/\\(\\)]");
    }

    // Helper method to get the precedence of an operator
    private static byte getOperatorPrecedence(String operator) {
        switch (operator) {
            case "+":
            case "-":
                return 1;
            case "*":
            case "/":
                return 2;
            default:
                return 0; // Default precedence for non-operators
        }
    }

    

}