// ** React Imports
import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

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
import './index.css';

const Images = () => {
  const [images, setImages] = useState([]);

  const handleImages = async () => {
    try {
      const images = await api.get('/files/image');

      setImages(images.data.files);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleImages();
  }, []);

  // ** Renders  products
  const renderImages = () => {
    //let i = 1
    return images.map((item) => {
      const CartBtnTag = item.isInCart ? Link : 'button';
      return (
        <Col xl={3} key={item.id}>
          <Card className="ecommerce-card">
            <div className="item-img text-center mx-auto">
              <img
                className="img-fluid"
                src={item.file_url}
                alt={item.file_url}
              />
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
                <Link
                  to={{
                    pathname: 'image/details',
                    state: { id: item.id, link_url: item.link_url },
                  }}
                >
                  <Button
                    color="primary"
                    tag={CartBtnTag}
                    className="btn-cart move-cart me-2"
                  >
                    Details
                  </Button>
                </Link>
                <Link
                  to={{
                    pathname: 'image/uploader',
                    state: { id: item.id },
                  }}
                >
                  <Button
                    color="primary"
                    tag={CartBtnTag}
                    className="btn-cart move-cart"
                  >
                    Update Image
                  </Button>
                </Link>
              </div>
              <div className="numero-da-imagem">
                <span>{item.img_index}</span>
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
        breadCrumbParent="Images"
        breadCrumbActive="Images"
      />

      {images.length ? (
        // <section className="grid-view wishlist-items">
        <Row>{renderImages()}</Row>
      ) : (
        // </section>
        <Alert color="info">
          <div className="alert-body">
            <Info size={14} />
            <span className="align-middle ms-50">Your Images is empty</span>
          </div>
        </Alert>
      )}
    </Fragment>
  );
};

export default Images;
