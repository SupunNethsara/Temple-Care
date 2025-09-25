<?php

it('can create a booking', function () {
    $response = $this->get('/bookingslots');

    $response->assertStatus(200);
});
