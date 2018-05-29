import React from 'react';
import styles from './Viewer.scss';
import {ChasingDots} from 'better-react-spinkit';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Viewer = ({mediaType, url, loading}) => {

    if(loading) {
      return <div className={cx('viewer')}>
        <ChasingDots color = "white" size = {60}/>
      </div>
    }  

    if(!url) return null;
    
    return(
        <div className={cx('viewer')}>
            {
        mediaType === 'image' ? (
          <img onClick={() => window.open(url)} src={url} alt="space"/>
        ) : (
          <iframe title="space-video" src={url} frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen></iframe>
        )
      }
        </div>
    );
};

export default Viewer;