using System.Collections.Generic;
using System.Linq;
using NLog;
using NzbDrone.Core.MediaCover;
using NzbDrone.Core.MetadataSource;
using NzbDrone.Core.Movies;
using NzbDrone.Core.Organizer;
using Radarr.Api.V3.Movies;
using Radarr.Http;

namespace NzbDrone.Api.V3.Movies
{
    public class MovieRecommendationsModule : RadarrRestModule<MovieResource>
    {
        private readonly IMovieService _movieService;
        private readonly IProvideMovieInfo _movieInfo;
        private readonly IBuildFileNames _fileNameBuilder;

        public MovieRecommendationsModule(IMovieService movieService, IProvideMovieInfo movieInfo, IBuildFileNames fileNameBuilder)
            : base("/movies/discover")
        {
            _movieService = movieService;
            _movieInfo = movieInfo;
            _fileNameBuilder = fileNameBuilder;
            Get("/", x => GetDiscoverMovies());
        }

        private object GetDiscoverMovies()
        {
            var results = _movieService.GetRecommendedMovies();

            var mapped = _movieInfo.GetBulkMovieInfo(results.Select(m => m.TmdbId).ToList());

            List<Movie> realResults = new List<Movie>();

            realResults.AddRange(mapped.Where(x => x != null));

            return MapToResource(realResults);
        }

        private IEnumerable<MovieResource> MapToResource(IEnumerable<Movie> movies)
        {
            foreach (var currentMovie in movies)
            {
                var resource = currentMovie.ToResource();
                var poster = currentMovie.Images.FirstOrDefault(c => c.CoverType == MediaCoverTypes.Poster);
                if (poster != null)
                {
                    resource.RemotePoster = poster.Url;
                }

                resource.Folder = _fileNameBuilder.GetMovieFolder(currentMovie);

                yield return resource;
            }
        }
    }
}
