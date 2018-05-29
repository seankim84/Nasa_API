import React from 'react';
import styles from './SpaceNavigator.scss';
import classNames from 'classnames/bind';
import LeftIcon from 'react-icons/lib/md/chevron-left';
import RightIcon from 'react-icons/lib/md/chevron-right';

const cx = classNames.bind(styles); 
// classNames.bind를 사용하면, 우리가 스타일을 넣을때마다 style=""을 사용할 필요가 없다.

const SpaceNavigator = ({onPrev, onNext}) => ( //props 값으로 onPrev, onNext를 사용
  <div className={cx('space-navigator')}>
    <div className={cx('left', 'end')}>
      <div className={cx('circle')} onClick={onPrev}>
        <LeftIcon />
      </div>
    </div>
    <div className={cx('right', 'end')}>
      <div className={cx('circle')} onClick={onNext}>
        <RightIcon />
      </div>
    </div>
  </div>
);

export default SpaceNavigator;
