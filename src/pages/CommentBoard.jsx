import React, { useState } from 'react';
import { Box, Button, Container, Input, Text, VStack } from '@chakra-ui/react';

const CommentBoard = () => {
  # Add a new state variable to store the list of comments
  const [comments, setComments] = useState([]);
  # Add a new state variable to store the new comment input
  const [newComment, setNewComment] = useState('');

  # Implement a function to handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Public Comment Board</Text>
        <Box width="100%">
          # Update the JSX to include an input field and a button for adding comments
          <Input
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button mt={2} colorScheme="blue" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Box>
        # Display the list of comments below the input field
        <VStack spacing={2} width="100%" alignItems="flex-start">
          {comments.map((comment, index) => (
            <Box key={index} p={4} bg="gray.100" borderRadius="md" width="100%">
              <Text>{comment}</Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default CommentBoard;