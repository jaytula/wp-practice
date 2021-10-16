<?php get_header(); ?>

<div class="page-banner">
    <div class="page-banner__bg-image" style="background-image: url(<?= get_theme_file_uri('/images/ocean.jpg') ?>)"></div>
    <div class="page-banner__content container container--narrow">
        <!-- <?php $title = is_category() ? single_cat_title('', false) : 'Posts by ' . get_the_author(); ?> -->
        <?php $title = get_the_archive_title() ?>
        <h1 class="page-banner__title">All Programs</h1>
        <div class="page-banner__intro">
            There is something for everyone. Have a look around.
        </div>
    </div>
</div>

<div class="container container--narrow page-section">
    <ul class="link-list min-list">
        <?php while (have_posts()) : ?>
            <?php the_post(); ?>
            <li><a href="<?php the_permalink() ?>"><?php the_title() ?></a></li>
        <?php endwhile; ?>
        <?php echo paginate_links() ?>
    </ul>
</div>

<?php get_footer(); ?>