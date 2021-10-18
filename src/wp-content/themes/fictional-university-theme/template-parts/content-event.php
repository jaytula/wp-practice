<div class="event-summary">
    <?php
    $event_date = new DateTime(get_field('event_date'));
    ?>
    <a class="event-summary__date t-center" href="#">
        <span class="event-summary__month"><?= $event_date->format('M')  ?></span>
        <span class="event-summary__day"><?= $event_date->format('d') ?></span>
    </a>
    <div class="event-summary__content">
        <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h5>
        <?php $excerpt = has_excerpt() ? get_the_excerpt() : wp_trim_words(get_the_content(), 18); ?>
        <p><?php echo $excerpt ?> <a href="<?php the_permalink() ?>" class="nu gray">Learn more</a></p>
    </div>
</div>