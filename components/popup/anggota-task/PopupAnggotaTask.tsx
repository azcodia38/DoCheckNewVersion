import React, { useEffect, useState } from 'react';
import { searchUsersByIDsAPI } from '../src/api/user';
import { User } from '../../../src/entity/User.entity';
import useAuthorization from '../../../hook/useAuthorization';
import PopupAnggota, { PopupAnggotaProps } from '../anggota-goal/PopupAnggota';

interface PopupAnggotaTaskProps extends PopupAnggotaProps {}

export default function PopupAnggotaTask(props: PopupAnggotaTaskProps) {
  return (
    <PopupAnggota {...props} />
  );
}
