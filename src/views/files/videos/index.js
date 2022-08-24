// ** React Imports
import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

import ReactPlayer from 'react-player/lazy';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Third Party Components
import { Star, X, ShoppingCart, Info } from 'react-feather';

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardText,
  Button,
  Alert,
  Row,
  Col,
  CardFooter,
} from 'reactstrap';

import { api } from '../../../services/api';

// ** Styles
import '@styles/base/pages/app-ecommerce.scss';

const Videos = () => {
  const [videos, setVideos] = useState([]);

  const handleVideos = async () => {
    try {
      const videos = await api.get('/files/video');

      setVideos(videos.data.files);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleVideos();
  }, []);

  // ** Renders  products
  const renderVideos = () => {
    return videos.map((item) => {
      const CartBtnTag = item.isInCart ? Link : 'button';
      return (
        <Col xl={6} key={item.id}>
          <Card className="ecommerce-card">
            <div className="item-img text-center mx-auto">
              <ReactPlayer url={item.file_url} controls />
            </div>
            <CardBody>
              <div className="item-wrapper">
                <div className="item-cost">
                  {/* <h6 className="item-price">{item.url}</h6> */}
                </div>
              </div>
              <div className="item-name">
                <Link
                  to={{
                    pathname: `/apps/ecommerce/product-detail/${item.slug}`,
                  }}
                >
                  {item.name}
                </Link>
              </div>
              <CardText className="item-description">
                {item.description}
              </CardText>
            </CardBody>
            <CardFooter>
              <div className="item-options text-center">
                {/* <Link
                  to={{ pathname: 'video/details', state: { id: item.id } }}
                >
                  <Button
                    color="primary"
                    tag={CartBtnTag}
                    className="btn-cart move-cart me-2"
                  >
                    Details
                  </Button>
                </Link> */}
                <Link
                  to={{ pathname: 'video/uploader', state: { id: item.id } }}
                >
                  <Button
                    color="primary"
                    tag={CartBtnTag}
                    className="btn-cart move-cart"
                  >
                    Update Video
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </Col>
      );
    });
  };

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Files"
        breadCrumbParent="Videos"
        breadCrumbActive="Videos"
      />

      {videos.length ? (
        // <section className="grid-view wishlist-items">
        <Row>{renderVideos()}</Row>
      ) : (
        // </section>
        <Alert color="info">
          <div className="alert-body">
            <Info size={14} />
            <span className="align-middle ms-50">Your Videos is empty</span>
          </div>
        </Alert>
      )}
    </Fragment>
  );
};

export default Videos;
