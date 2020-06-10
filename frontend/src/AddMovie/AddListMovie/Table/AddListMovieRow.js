import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons } from 'Helpers/Props';
import HeartRating from 'Components/HeartRating';
import IconButton from 'Components/Link/IconButton';
import VirtualTableRowCell from 'Components/Table/Cells/VirtualTableRowCell';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import ListMovieStatusCell from './ListMovieStatusCell';
import Link from 'Components/Link/Link';
import AddNewMovieModal from 'AddMovie/AddNewMovie/AddNewMovieModal';
import ExcludeMovieModal from 'AddMovie/AddListMovie/Exclusion/ExcludeMovieModal';
import styles from './AddListMovieRow.css';

class AddListMovieRow extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isNewAddMovieModalOpen: false,
      isExcludeMovieModalOpen: false
    };
  }

  //
  // Listeners

  onAddMoviePress = () => {
    this.setState({ isNewAddMovieModalOpen: true });
  }

  onAddMovieModalClose = () => {
    this.setState({ isNewAddMovieModalOpen: false });
  }

  onExcludeMoviePress = () => {
    this.setState({ isExcludeMovieModalOpen: true });
  }

  onExcludeMovieModalClose = () => {
    this.setState({ isExcludeMovieModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      status,
      tmdbId,
      title,
      titleSlug,
      studio,
      inCinemas,
      physicalRelease,
      year,
      overview,
      folder,
      images,
      genres,
      ratings,
      certification,
      columns,
      isExistingMovie,
      isExclusionMovie
    } = this.props;

    const {
      isNewAddMovieModalOpen,
      isExcludeMovieModalOpen
    } = this.state;

    const linkProps = isExistingMovie ? { to: `/movie/${titleSlug}` } : { onPress: this.onAddMoviePress };

    return (
      <>
        {
          columns.map((column) => {
            const {
              name,
              isVisible
            } = column;

            if (!isVisible) {
              return null;
            }

            if (name === 'status') {
              return (
                <ListMovieStatusCell
                  key={name}
                  className={styles[name]}
                  status={status}
                  isExclusion={isExclusionMovie}
                  component={VirtualTableRowCell}
                />
              );
            }

            if (name === 'sortTitle') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  <Link
                    {...linkProps}
                  >
                    {title}
                  </Link>
                </VirtualTableRowCell>
              );
            }

            if (name === 'studio') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  {studio}
                </VirtualTableRowCell>
              );
            }

            if (name === 'inCinemas') {
              return (
                <RelativeDateCellConnector
                  key={name}
                  className={styles[name]}
                  date={inCinemas}
                  component={VirtualTableRowCell}
                />
              );
            }

            if (name === 'physicalRelease') {
              return (
                <RelativeDateCellConnector
                  key={name}
                  className={styles[name]}
                  date={physicalRelease}
                  component={VirtualTableRowCell}
                />
              );
            }

            if (name === 'genres') {
              const joinedGenres = genres.join(', ');

              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  <span title={joinedGenres}>
                    {joinedGenres}
                  </span>
                </VirtualTableRowCell>
              );
            }

            if (name === 'ratings') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  <HeartRating
                    rating={ratings.value}
                  />
                </VirtualTableRowCell>
              );
            }

            if (name === 'certification') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  {certification}
                </VirtualTableRowCell>
              );
            }

            if (name === 'actions') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  <IconButton
                    name={icons.REMOVE}
                    title={isExclusionMovie ? 'Movie already Excluded' : 'Exclude Movie'}
                    onPress={this.onExcludeMoviePress}
                    isDisabled={isExclusionMovie}
                  />
                </VirtualTableRowCell>
              );
            }

            return null;
          })
        }

        <AddNewMovieModal
          isOpen={isNewAddMovieModalOpen && !isExistingMovie}
          tmdbId={tmdbId}
          title={title}
          year={year}
          overview={overview}
          folder={folder}
          images={images}
          onModalClose={this.onAddMovieModalClose}
        />

        <ExcludeMovieModal
          isOpen={isExcludeMovieModalOpen}
          tmdbId={tmdbId}
          title={title}
          year={year}
          onModalClose={this.onExcludeMovieModalClose}
        />
      </>
    );
  }
}

AddListMovieRow.propTypes = {
  tmdbId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  titleSlug: PropTypes.string.isRequired,
  studio: PropTypes.string,
  inCinemas: PropTypes.string,
  physicalRelease: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  ratings: PropTypes.object.isRequired,
  certification: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  isExistingMovie: PropTypes.bool.isRequired,
  isExclusionMovie: PropTypes.bool.isRequired
};

AddListMovieRow.defaultProps = {
  genres: [],
  tags: []
};

export default AddListMovieRow;
