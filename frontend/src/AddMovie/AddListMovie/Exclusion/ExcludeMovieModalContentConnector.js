import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNetImportExclusion } from 'Store/Actions/settingsActions';
import ExcludeMovieModalContent from './ExcludeMovieModalContent';

const mapDispatchToProps = {
  addNetImportExclusion
};

class ExcludeMovieModalContentConnector extends Component {

  //
  // Listeners

  onExcludePress = () => {
    this.props.addNetImportExclusion({
      tmdbId: this.props.tmdbId,
      movieTitle: this.props.title,
      movieYear: this.props.year
    });

    this.props.onModalClose(true);
  }

  //
  // Render

  render() {
    return (
      <ExcludeMovieModalContent
        {...this.props}
        onExcludePress={this.onExcludePress}
      />
    );
  }
}

ExcludeMovieModalContentConnector.propTypes = {
  tmdbId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  onModalClose: PropTypes.func.isRequired,
  addNetImportExclusion: PropTypes.func.isRequired
};

export default connect(undefined, mapDispatchToProps)(ExcludeMovieModalContentConnector);
