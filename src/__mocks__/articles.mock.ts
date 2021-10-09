import { ArticleMetaKey, IArticleBasic } from '@src/models/article.interface';

export const __articleMock: IArticleBasic = {
  id: 1,
  title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  metaTitle: 'lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit',
  slug: 'lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-1',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem eveniet animi totam velit! Sit consequuntur ut praesentium amet dolore laboriosam.',
  content:
    '<h2 style="margin-left:0px;"><strong>Mở đầu</strong></h2><p>Trước khi bắt đầu bài đọc này, bạn nên đọc bài viết trước của series để có những kiến thức cơ bảnvề cách chúng ta có những chuỗi hash sử dụng trong blockchain</p><h2 style="margin-left:0px;"><strong>Mã hóa khóa đối xứng (Symmetric-key cryptography)</strong></h2><h3 style="margin-left:0px;"><strong>Mã hóa đối xứng là gì?</strong></h3><p>Là một phương pháp mã hóa trong đó một khóa giống nhau sẽ vừa được dùng để mã hóa, vừa được dùng để giải mã các tệp tin.</p><h3 style="margin-left:0px;"><strong>Cách thức hoạt động</strong></h3><p>Một sơ đồ mã hóa đối xứng thường sử dụng một khóa đơn được chia sẻ giữa 2 hoặc nhiều người dùng với nhau. Khóa duy nhất này sẽ được dùng cho cả 2 tác vụ mã hóa và giải mã các văn bản thô (các tin nhắn hoặc mảnh dữ liệu cần được mã hóa). Quá trình mã hóa bao gồm việc chạy văn bản thô (đầu vào) thông qua một thuật toán mã hóa còn gọi là mật mã (cipher) sẽ lần luợt tạo ra các bản mã - ciphertext (đầu ra).</p>',
  published: true,
  author: {
    id: 1,
    firstName: 'Nhật',
    lastName: 'Bùi',
    avatar: 'https://bit.ly/2WElp9q',
    about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
  },
  parent: null,
  children: [],
  metas: [
    {
      id: 1,
      key: ArticleMetaKey.BANNER,
      content: 'https://timviec365.com/pictures/images/coder-la-gi-6(1).jpg'
    }
  ],
  category: {
    id: 1,
    level: 2,
    title: 'Category'
  },
  tags: [
    {
      id: 1,
      title: 'html'
    },
    {
      id: 2,
      title: 'css'
    },
    {
      id: 1,
      title: 'js'
    }
  ],
  comments: [
    {
      id: 1,
      content: 'Nice bro',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};

export const __articlesMock: IArticleBasic[] = new Array<IArticleBasic>(10).fill(__articleMock);
