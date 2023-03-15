import { BlackUserData } from './../utils/types/users/user.type';
import { LetterUserData } from './../utils/types/letter/user.type';

export const userData: LetterUserData[] = [
  {
    profile: null,
    name: '안아영',
    memberId: 1,
    location: 'KR',
    birthday: '1994-12-22',
    lastLetter: {
      status: 'SENT',
      createdAt: '2023-02-28T10:49:01',
      isRead: true,
    },
  },
  {
    profile:
      'https://images.unsplash.com/photo-1678135171573-a76ebf2eae56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'はるひ',
    memberId: 2,
    location: 'JP',
    birthday: '1996-03-23',
    lastLetter: {
      status: 'RECEIVED',
      createdAt: '2023-02-28T09:12:01',
      isRead: true,
    },
  },
  {
    profile:
      'https://images.unsplash.com/photo-1678198628337-e0f4abe54593?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    name: '范冰冰',
    memberId: 3,
    location: 'CN',
    birthday: '2023-02-28',
    lastLetter: {
      status: 'RECEIVED',
      createdAt: '2023-02-28T19:12:01',
      isRead: true,
    },
  },
  {
    profile: null,
    name: 'Jennie',
    memberId: 4,
    location: 'US',
    birthday: '2023-02-28',
    lastLetter: {
      status: 'RECEIVED',
      createdAt: '2023-02-28T11:30:01',
      isRead: true,
    },
  },
  {
    profile: null,
    name: 'mefistoo',
    memberId: 5,
    location: 'TR',
    birthday: '2023-02-28',
    lastLetter: {
      status: 'RECEIVED',
      createdAt: '2023-02-28T23:12:01',
      isRead: true,
    },
  },
  {
    profile:
      'https://images.unsplash.com/photo-1678203822791-6ae64ce46855?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: '안아영',
    memberId: 6,
    location: 'KR',
    birthday: '2023-02-28',
    lastLetter: {
      status: 'SENT',
      createdAt: '2023-02-28T03:12:01',
      isRead: true,
    },
  },
  {
    profile: null,
    name: 'はるひ',
    memberId: 7,
    location: 'JP',
    birthday: '2023-02-28',
    lastLetter: {
      status: 'RECEIVED',
      createdAt: '2023-02-28T19:12:01',
      isRead: true,
    },
  },
  {
    profile:
      'https://images.unsplash.com/photo-1676720372380-309db527869a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
    name: '范冰冰',
    memberId: 8,
    location: 'CN',
    birthday: '2023-02-28',
    lastLetter: {
      status: 'SENT',
      createdAt: '2023-02-28T19:12:01',
      isRead: true,
    },
  },
  {
    profile: null,
    name: 'Jennie',
    memberId: 9,
    location: 'US',
    birthday: '2023-02-28',
    lastLetter: {
      status: 'RECEIVED',
      createdAt: '2023-02-28T19:12:01',
      isRead: true,
    },
  },
  {
    profile:
      'https://images.unsplash.com/photo-1678043639486-c79cb3aa965f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    name: 'mefistoo',
    memberId: 10,
    location: 'TR',
    birthday: '2023-02-28',
    lastLetter: {
      status: 'RECEIVED',
      createdAt: '2023-02-28T19:12:01',
      isRead: true,
    },
  },
];

export const blackListData: BlackUserData[] = [
  {
    profile: null,
    name: '안아영',
    memberId: 1,
    location: 'KR',
  },
  {
    profile: null,
    name: '하루히',
    memberId: 2,
    location: 'JP',
  },
  {
    profile:
      'https://images.unsplash.com/photo-1670272499188-79fe22656f64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'James',
    memberId: 3,
    location: 'US',
  },
];
