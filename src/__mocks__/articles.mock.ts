import { IArticleBasic } from '@src/models/article.model';

import { __userMock } from './user.mock';
import { __articleCategoryMock } from './article-categories.mock';
import { __articleTagsMock } from './article-tags.mock';

export const __articleMock: IArticleBasic = {
  id: 1,
  title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem eveniet animi totam velit! Sit consequuntur ut praesentium amet dolore laboriosam.',
  content: `## C\u00E0i \u0111\u1EB7t Docker tr\u00EAn Ubuntu\r\n\r\n### G\u1EE1 c\u00E0i \u0111\u1EB7t phi\u00EAn b\u1EA3n c\u0169\r\nTr\u01B0\u1EDBc ti\u00EAn, n\u1EBFu b\u1EA1n \u0111\u00E3 t\u1EEBng c\u00E0i \u0111\u1EB7t Docker h\u00E3y g\u1EE1 c\u00E0i \u0111\u1EB7t ch\u00FAng b\u1EB1ng l\u1EC7nh:\r\n~~~bash\r\nsudo apt-get remove docker docker-engine docker.io containerd runc\r\n~~~\r\n\r\n### Thi\u1EBFt l\u1EADp kho l\u01B0u tr\u1EEF cho Docker\r\n1. Update c\u00E1c package v\u00E0 c\u00E0i c\u00E1c package c\u1EA7n thi\u1EBFt:\r\n~~~bash\r\n$ sudo apt-get update\r\n$ sudo apt-get install \\\r\n   apt-transport-https \\\r\n   ca-certificates \\\r\n   curl \\\r\n   gnupg \\\r\n   lsb-release\r\n~~~\r\n\u0110\u1EC3 c\u00E1c b\u1EA1n hi\u1EC3u r\u00F5 h\u01A1n th\u00EC d\u01B0\u1EDBi \u0111\u00E2y l\u00E0 \u00FD ngh\u0129a c\u01A1 b\u1EA3n c\u1EE7a n\u00F3:\r\n - **apt-transport-https:** gi\u00FAp package manager chuy\u1EC3n file v\u00E0 data qua https.\r\n - **ca-certificates:** gi\u00FAp web browser v\u00E0 h\u1EC7 th\u1ED1ng ki\u1EC3m tra certificate b\u1EA3o m\u1EADt.\r\n - **curl:** chuy\u1EC3n data.\r\n - **gnupg:** m\u00E3 h\u00F3a v\u00E0 gi\u1EA3i m\u00E3.\r\n - **lsb-release:** cung c\u1EA5p m\u1ED9t s\u1ED1 th\u00F4ng tin c\u1EE5 th\u1EC3 v\u1EC1 LSB (Linux Standard Base) v\u00E0 ph\u00E2n ph\u1ED1i c\u1EE5 th\u1EC3.\r\n\r\n2. Th\u00EAm Docker\u2019s official GPG key:\r\n~~~bash\r\ncurl -fsSL https:\/\/download.docker.com\/linux\/ubuntu\/gpg | sudo apt-key add -\r\n~~~\r\n\r\n3. Th\u00EAm Docker Repository:\r\n~~~bash\r\nsudo add-apt-repository \"deb [arch=amd64] https:\/\/download.docker.com\/linux\/ubuntu $(lsb_release -cs) stable\"\r\n~~~\r\n\r\n### C\u00E0i \u0111\u1EB7t Docker:\r\n1. S\u1EED d\u1EE5ng l\u1EC7nh apt \u0111\u1EC3 c\u00E0i \u0111\u1EB7t Docker tr\u00EAn Ubuntu:\r\n~~~bash\r\n$ sudo apt-get update\r\n$ sudo apt-get install docker-ce docker-ce-cli containerd.io\r\n~~~\r\n\r\n## Thi\u1EBFt l\u1EADp Laravel, Nginx v\u00E0 Mysql v\u1EDBi Docker Compose\r\n### Kh\u1EDFi t\u1EA1o Laravel\r\nB\u1EA1n h\u00E3y tr\u1ECF \u0111\u1EBFn th\u01B0 m\u1EE5c ch\u00EDnh b\u1EA1n mu\u1ED1n \u0111\u1EB7t project sau \u0111\u00F3 ch\u1EA1y l\u1EC7nh:\r\n~~~bash\r\n$ composer create-project --prefer-dist laravel\/laravel docker-laravel\r\n~~~\r\n### Setup JS\r\n~~~js\r\nfunction test(num) {\r\n    return num + 1;\r\n}\r\n~~~`,
  published: true,
  author: __userMock,
  banner: 'https://timviec365.com/pictures/images/coder-la-gi-6(1).jpg',
  category: __articleCategoryMock,
  tags: __articleTagsMock.slice(0, 3),
  comments: [
    {
      id: 1,
      content: 'Nice bro',
      user: __userMock,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      user: __userMock,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};

export const __articlesMock: IArticleBasic[] = new Array<IArticleBasic>(10).fill({
  ...__articleMock,
  id: 1 + Math.random() * 1000
});
