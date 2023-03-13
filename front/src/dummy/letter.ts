import { LetterData } from './../utils/types/letter/letter.type';

export const lettersData: LetterData[] = [
  {
    letterId: 1,
    sender: {
      memberId: 1,
      name: '안아영',
    },
    receiver: {
      memberId: 2,
      name: '하루히',
    },
    // title: 'test',
    body: `
    ありがとうと君に言われるとなんだか切ないさようならの後も解けぬ魔法淡くほろ苦い友達でも恋人でもない中間地点で収穫の時を夢見てる青いフルーツあと一歩が踏み出せないせいで じれったいの何のって ありがとうと君に言われるとなんだか切ないさようならの後も解けぬ魔法淡くほろ苦い甘いだけの誘い文句味気のないTalkそんなものには興味をそそられない思い通りにいかない時だって人生捨てたもんじゃないって「どうしたの」と急に聞かれると「ううん、何でもない」さようならの後に消える笑顔私らしくない信じたいと願えば願うほどなんだか切ない「愛してるよ」よりも「大好き」の方が君らしいんじゃない忘れかけてた人の香りを突然思い出す頃降り積もる雪の白さをもっと素直に喜びたいよダイヤモンドよりも軟らかくて温かな未来手にしたいよ限りある時間を君と過ごした`,
    isRead: false,
    availableAt: '2023-03-12T11:12:01',
    canRead: true,
    createdAt: '2023-02-28T19:12:01',
    hasPic: true,
  },
  {
    letterId: 2,
    sender: {
      memberId: 2,
      name: '하루히',
    },
    receiver: {
      memberId: 1,
      name: '안아영',
    },
    // title: 'test',
    isRead: true,
    canRead: true,
    body: `ありがとうと君に言われると
何だか切ないサヨナラの後も
解けぬ魔法淡くほろ苦い
友達でも恋人でもない
中間視点で收穫の日を夢見...`,
    availableAt: '2023-03-12T12:12:01',
    createdAt: '2023-02-28T19:12:01',
    hasPic: true,
  },
  {
    letterId: 3,
    sender: {
      memberId: 2,
      name: '하루히',
    },
    receiver: {
      memberId: 1,
      name: '안아영',
    },
    // title: 'test',
    isRead: true,
    canRead: false,
    body: 'test',
    availableAt: '2023-03-12T12:12:01',
    createdAt: '2023-02-28T19:12:01',
    hasPic: false,
  },
];
