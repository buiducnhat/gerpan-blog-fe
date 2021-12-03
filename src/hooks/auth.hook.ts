import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@src/hooks/redux.hook';
import { getToken } from '@src/utils/token.util';
import { selectIsAuth, selectUser, fetchGetMe } from '@src/redux/auth/auth.slice';
import { IUserBasic } from '@src/models/user.model';

export const useGetMe = (): { isAuth: boolean; userInfo: IUserBasic | null } => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuth);
  const userInfo = useAppSelector(selectUser);

  useEffect(() => {
    !isAuth && !userInfo && dispatch(fetchGetMe());
  }, [dispatch, isAuth, userInfo]);

  return { isAuth, userInfo };
};

// export const useRequireAuth = (preUrl: string) => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const isAuth = useAppSelector(selectIsAuth);
//   const isFetchingGetUserInfo = useAppSelector((state) => state.authen.fetchGetUserInfoMsg);
//   const fetchGetUserInfoMsg = useAppSelector((state) => state.authen.fetchGetUserInfoMsg);

//   useEffect(() => {
//     dispatch(fetchGetUserInfo(null));
//   }, [dispatch]);

//   useEffect(() => {
//     // case reload page
//     if (!getToken() || !!fetchGetUserInfoMsg) {
//       router.push(ROUTES.login, { query: { preUrl } });
//     }
//     // case logged out
//     if (!getToken() && !isAuth && !isFetchingGetUserInfo) {
//       router.push(ROUTES.login, { query: { preUrl } });
//     }
//   }, [fetchGetUserInfoMsg, isAuth, isFetchingGetUserInfo, preUrl, router]);
// };
