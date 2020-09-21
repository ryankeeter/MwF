import SignupComponent from '../Components/Signup';
import styled from 'styled-components';

const Columns = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
    `;

const SignupPage = props => (
    <Columns>
       <SignupComponent></SignupComponent>
       <SignupComponent></SignupComponent>
       <SignupComponent></SignupComponent>
    </Columns>
);

export default SignupPage;
