import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  font-family: sans-serif;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  height: 30px;
  border-radius: 5px;
  border: none;
  padding: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  height: 100px;
  border-radius: 5px;
  border: none;
  padding: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #2c3e50;
  }
`;

export default function ProfileCreation() {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | undefined>(undefined);
  const [biography, setBiography] = useState('');

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setProfilePicture(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <Wrapper>
      <h1>Create Your Profile</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="biography">Biography:</Label>
          <TextArea
            id="biography"
            value={biography}
            onChange={(event) => setBiography(event.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="profile-picture">Profile Picture:</Label>
          <Input type="file" id="profile-picture" onChange={handleProfilePictureChange} />
        </InputGroup>
        <Button type="submit">Create Profile</Button>
      </Form>
    </Wrapper>
  );
}
