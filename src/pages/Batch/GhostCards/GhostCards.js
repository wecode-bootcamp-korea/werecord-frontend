import React from 'react';
import styled from 'styled-components';
import findDefaultImg from '../../Util/findDefaultImg';

export default function GhostCards({ rank }) {
  return (
    <StyledGhostCards className="test">
      {rank.length !== 0 ? (
        <>
          {rank.map((person, index) => (
            <GhostCard key={index}>
              <img
                alt={person.user_name}
                src={findDefaultImg(person.user_profile_image_url)}
              />
              <MateInfo key={index}>
                <div className="grade">{index + 1}위</div>
                <PersonName>
                  <div className="name">{person.user_name}</div>
                  <div className="hour">
                    {person.user_last_week_total_time}시간
                  </div>
                </PersonName>
              </MateInfo>
            </GhostCard>
          ))}
        </>
      ) : (
        <BeforeRank>
          다음주,
          <br /> 첫 지박령 순위가
          <br />
          발표됩니다.
        </BeforeRank>
      )}
    </StyledGhostCards>
  );
}

const StyledGhostCards = styled.ul`
  ${({ theme }) => theme.flexbox('row', 'flex-start')};
  width: 100%;
  overflow: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const GhostCard = styled.li`
  ${({ theme }) => theme.flexbox('row')};
  margin: 20px 10px 0 0;
  padding: 20px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};

  &:last-child {
    margin-right: 0;
  }

  ${({ theme }) => theme.mobile`
    height: 70px;
    margin: 10px 6px 0 0;
    padding: 13px;
  `};

  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;

    ${({ theme }) => theme.mobile`
      width: 40px;
      height: 40px;
    `};
  }
`;

const MateInfo = styled.div`
  ${({ theme }) => theme.flexbox('column', 'flex-start', 'flex-start')};
  margin-left: 10px;
  font-family: Noto Sans KR;

  ${({ theme }) => theme.mobile`
    margin-left: 6px;
  `};

  .grade {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.purple};

    ${({ theme }) => theme.mobile`
      font-size: 16px;
    `}
  }
`;

const PersonName = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'center')};
  width: 140px;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.purple};

  ${({ theme }) => theme.mobile`
    font-size: 11px;
  `}

  .name {
    margin-right: 10px;
    font-weight: normal;
  }
`;

const BeforeRank = styled.div`
  ${({ theme }) => theme.flexbox('column')};
  width: 200px;
  height: 92px;
  margin-top: 20px;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(13)};
  font-weight: 700;
  font-family: Noto Sans KR;
  line-height: 19px;
  text-align: center;
  color: ${({ theme }) => theme.colors.fontColorPurple};
  background: ${({ theme }) => theme.colors.white};
`;
