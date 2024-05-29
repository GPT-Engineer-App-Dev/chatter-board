import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Input, Text, VStack, useToast } from '@chakra-ui/react';

const CommentBoard = () => {
  const toast = useToast();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    try {
      const storedComments = localStorage.getItem('comments');
      if (storedComments) {
        const parsedComments = JSON.parse(storedComments);
        if (Array.isArray(parsedComments)) {
          setComments(parsedComments);
        } else {
          console.error('Stored comments are not an array');
          setComments([]);
        }
      }
    } catch (error) {
      console.error('Error loading comments from localStorage:', error);
      setComments([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('comments', JSON.stringify(comments));
    } catch (error) {
      console.error('Error saving comments to localStorage:', error);
    }
  }, [comments]);

  useEffect(() => {
    console.log('Current comments state:', comments);
  }, [comments]);

  const handleAddComment = () => {
    try {
      if (newComment.trim() === '') {
        throw new Error('Comment cannot be empty');
      }
      if (comments.includes(newComment)) {
        throw new Error('Duplicate comment');
      }
      setComments((prevComments) => {
        if (!Array.isArray(prevComments)) {
          throw new Error('Comments state is not an array');
        }
        return [...prevComments, newComment];
      });
      setNewComment('');
      toast({
        title: 'Comment added.',
        description: "Your comment has been added successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Public Comment Board</Text>
        <Box width="100%">
          <Input
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button mt={2} colorScheme="blue" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Box>
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