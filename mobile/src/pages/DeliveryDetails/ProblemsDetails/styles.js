import styled from 'styled-components/native';

import Text from '~/components/Text';
import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Background = styled.View`
  background: ${colors.primary};
  height: 140px;
`;

export const Content = styled.View`
  top: -70px;
`;

export const Title = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  /* letter-spacing: 1px; */
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;
