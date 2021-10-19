<?php
get_header();
pageBanner(array(
    'title' => 'Our Campuses',
    'subtitle' => 'We have several conveniently located campuses'
));
?>

<div class="container container--narrow page-section">
    <div class="acf-map">
        <?php while (have_posts()) : ?>
            <?php the_post(); ?>
            <?php $mapLocation = get_field('map_location'); ?>
            <div class="marker" data-lat="<?= $mapLocation['lat'] ?>" data-lng="<?= $mapLocation['lng'] ?>"></div>
        <?php endwhile; ?>
        <?php echo paginate_links() ?>
    </div>
</div>

<?php get_footer(); ?>