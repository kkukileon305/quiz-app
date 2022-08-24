import styled from 'styled-components';

const StyledSkeleton = styled.div`
  padding: 20px;
  div.title {
    div.num {
      height: 30px;
      width: 30px;
      background-color: lightgray;
      margin-bottom: 10px;
    }

    div.titleText {
      height: 20px;
      background-color: lightgray;
      margin-bottom: 10px;

      &:last-of-type {
        width: 40%;
        margin-bottom: 0;
      }
    }
    margin-bottom: 40px;
  }

  div.answer {
    div.btn {
      height: 50px;
      background-color: lightgray;
      margin-bottom: 20px;
    }
  }

  div.container {
    display: flex;
    gap: 20px;
    padding-top: 20px;

    div {
      width: 100%;
      height: 50px;
      background-color: lightgray;
    }
  }
`;

const QuizSkeleton = () => {
  return (
    <StyledSkeleton>
      <div className='title'>
        <div className='num' />
        <div className='titleText' />
        <div className='titleText' />
        <div className='titleText' />
        <div className='titleText' />
      </div>
      <div className='answer'>
        <div className='btn' />
        <div className='btn' />
        <div className='btn' />
        <div className='btn' />
      </div>
      <div className='container'>
        <div />
        <div />
      </div>
    </StyledSkeleton>
  );
};

export default QuizSkeleton;
